import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../product/repository/sequelize/product.model';
import Product from '../../../../domain/product/entity/product';
import ProductRepository from '../../../product/repository/sequelize/product.repository';
import CustomerModel from '../../../customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../customer/repository/sequelize/customer.repository';
import Customer from '../../../../domain/customer/entity/customer';
import Address from '../../../../domain/customer/value-object/address';
import OrderModel from './order.model';
import OrderItemModel from './order-item.model';
import Order from '../../../../domain/checkout/entity/order';
import OrderItem from '../../../../domain/checkout/entity/order_item';
import OrderRepository from './order.repository';

describe("Order repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel, ProductModel, OrderModel, OrderItemModel])
        await sequelize.sync();

    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1",);
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        const product2 = new Product("2", "Product 2", 200);
        await productRepository.create(product);
        await productRepository.create(product2);

        const item1 = new OrderItem("1", "Product 1", 100, "1", 1);
        const item2 = new OrderItem("2", "Product 2", 200, "2", 2);

        const order = new Order("1", "1", [item1, item2]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel
            .findOne({
                where: { id: "1" },
                include: ["items"]
            });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "1",
            customer_id: "1",
            total: order.total(),
            items: [
                {
                    id: item1.id,
                    name: item1.name,
                    price: item1.price,
                    quantity: item1.quantity,
                    order_id: "1",
                    product_id: "1"
                },
                {
                    id: item2.id,
                    name: item2.name,
                    price: item2.price,
                    quantity: item2.quantity,
                    order_id: "1",
                    product_id: "2"
                }
            ]
        });

    });

    it("should update a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1",);
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        const product2 = new Product("2", "Product 2", 200);
        await productRepository.create(product);
        await productRepository.create(product2);

        let item1 = new OrderItem("1", "Product 1", 100, "1", 1);
        const item2 = new OrderItem("2", "Product 2", 200, "2", 2);

        const order = new Order("1", "1", [item1, item2]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel
            .findOne({
                where: { id: "1" },
                include: ["items"]
            });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "1",
            customer_id: "1",
            total: order.total(),
            items: [
                {
                    id: item1.id,
                    name: item1.name,
                    price: item1.price,
                    quantity: item1.quantity,
                    order_id: "1",
                    product_id: "1"
                },
                {
                    id: item2.id,
                    name: item2.name,
                    price: item2.price,
                    quantity: item2.quantity,
                    order_id: "1",
                    product_id: "2"
                }
            ]
        });


        item1.increaseQuantity(1);
        await orderRepository.update(order);

        const orderModel2 = await OrderModel
            .findOne({
                where: { id: "1" },
                include: ["items"]
            });

        expect(orderModel2.toJSON()).toStrictEqual({
            id: "1",
            customer_id: "1",
            total: order.total(),
            items: [
                {
                    id: item1.id,
                    name: item1.name,
                    price: item1.price,
                    quantity: item1.quantity,
                    order_id: "1",
                    product_id: "1"
                },
                {
                    id: item2.id,
                    name: item2.name,
                    price: item2.price,
                    quantity: item2.quantity,
                    order_id: "1",
                    product_id: "2"
                }
            ]
        });

    });

    it("should find a order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1",);
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        const product2 = new Product("2", "Product 2", 200);
        await productRepository.create(product);
        await productRepository.create(product2);

        const item1 = new OrderItem("1", "Product 1", 100, "1", 1);
        const item2 = new OrderItem("2", "Product 2", 200, "2", 2);

        const order = new Order("1", "1", [item1, item2]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel
            .findOne({
                where: { id: "1" },
                include: ["items"]
            });



        const foundOrder = await orderRepository.find("1");

        expect(orderModel.toJSON()).toStrictEqual({
            id: foundOrder.id,
            customer_id: foundOrder.customerId,
            total: foundOrder.total(),
            items: foundOrder.items.map(i => ({
                id: i.id,
                name: i.name,
                price: i.price,
                product_id: i.productId,
                quantity: i.quantity,
                order_id: foundOrder.id
            }))
        
        });

    });

    it("should find all order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1",);
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        const product2 = new Product("2", "Product 2", 200);
        await productRepository.create(product);
        await productRepository.create(product2);

        const item1 = new OrderItem("1", "Product 1", 100, "1", 1);
        const item2 = new OrderItem("2", "Product 2", 200, "2", 2);

        const order = new Order("1", "1", [item1, item2]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const item3 = new OrderItem("3", "Product 1", 100, "1", 1);
        const order2 = new Order("12", "1", [item3]);
        await orderRepository.create(order2);

        const foundOrders = await orderRepository.findAll();
        const orders = [order, order2];

        expect(orders).toEqual(foundOrders);

    });
});