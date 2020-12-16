import pizzas from '../data.json'

test('the pizza data is correct', () => {
    expect(pizzas).toMatchSnapshot()
    expect(1).toEqual(1)
})

test('length is right size', () => {
    expect(pizzas).toHaveLength(4)
})

test('use map over name', () => {
    expect(pizzas.map(x => x.name)).toEqual([
        'Chicago Pizza',
        'Neapolitan Pizza',
        'New York Pizza',
        'Sicilian Pizza'
    ])
})
for (let i = 0; i < pizzas.length; i++) {
    test(`pizza[${i}] should have props (id, name, image, desc, price)`, () => {
        expect(pizzas[i]).toHaveProperty('id')
        expect(pizzas[i]).toHaveProperty("name");
        expect(pizzas[i]).toHaveProperty("desc");
        expect(pizzas[i]).toHaveProperty("price");
    })
}

test('mock implemnetation of basic function', () => {
    const mock = jest.fn(() => 'I am a mock function')
    // console.log(mock)
    expect(mock('Calling my mock function!')).toBe('I am a mock function');
    expect(mock).toHaveBeenCalledWith('Calling my mock function!')
}); 

test('mock return value of a function one time', () => {
    const mock =jest.fn()

    mock.mockReturnValueOnce("Hello").mockReturnValueOnce("Trello");
    mock()
    mock()
    expect(mock).toHaveBeenCalledTimes(2)

    mock('hello', 'there', 'steve')
    expect(mock).toHaveBeenCalledWith('hello', 'there', 'steve')
    
    mock('steve')
    expect(mock).toHaveBeenCalledWith('steve')
});

test('mock implementation of a function', () => {
    const mock = jest.fn().mockImplementation(() => 'united kingdom')
    expect(mock('location')).toBe('united kingdom')
    expect(mock).toHaveBeenCalledWith('location')
});

test('spying using the original implementation', () => {
    const pizza = {
        name: n => `Pizza name: ${n}`
    }
    const spy = jest.spyOn(pizza, 'name')
    expect(pizza.name('Cheese')).toBe('Pizza name: Cheese')
    expect(spy).toHaveBeenCalledWith('Cheese')
});

test('spying using mockImplementation', () => {
    const pizza = {
        name: n=> `Pizza name: ${n}`
    }
    const spy = jest.spyOn(pizza, 'name')
    spy.mockImplementation(n => `Crazy pizza`)
    expect(pizza.name('Cheese')).toBe('Crazy pizza')
    spy.mockRestore()
    expect(pizza.name('Cheese')).toBe('Pizza name: Cheese')
});

test('pizza returns new york last', () => {
    const pizza1 = pizzas[0]
    const pizza2 = pizzas[1]
    const pizza3 = pizzas[2]
    const pizza = jest.fn(currentPizza => currentPizza.name)
    pizza(pizza1);
    pizza(pizza2);
    pizza(pizza3);
    expect(pizza).toHaveLastReturnedWith('New York Pizza')
});

test("pizza data has new york pizza and matches as an object", () => {
    const newYorkPizza = {
    "id": 3,
    "name": "New York Pizza",
    "image": "/images/ny-pizza.jpg",
    "desc": "New York-style pizza has slices that are large and wide with a thin crust that is foldable yet crispy. It is traditionally topped with tomato sauce and mozzarella cheese.",
    "price": 8
  };
  expect(pizzas[2]).toMatchObject(newYorkPizza)
});

test('expect a promise to resolve', async () => {
    const user = {
        getFullName: jest.fn(() => Promise.resolve('Karl Hadwen')),
    }
    await expect(user.getFullName('Karl Hadwen')).resolves.toBe('Karl Hadwen')
});

test("expect a promise to reject", async () => {
  const user = {
    getFullName: jest.fn(() => Promise.reject(new Error("Something went terribly wrong."))),
  };
  await expect(user.getFullName("Karl Hadwen")).rejects.toThrow("Something went terribly wrong");
}); 