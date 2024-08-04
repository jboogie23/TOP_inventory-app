import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { jsxRenderer, useRequestContext } from 'hono/jsx-renderer';

// Define the app and types
type Bindings = {
	DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

type Category = {
	id: number;
	name: string;
};

type Item = {
	id: number;
	name: string;
	description: string;
	category_id: number;
};

// JSX renderer setup
app.get(
	'*',
	jsxRenderer(({ children }) => {
		return (
			<html>
				<head>
					<title>Inventory App</title>
					<script src="https://unpkg.com/htmx.org@1.9.10"></script>
					<script src="https://cdn.tailwindcss.com"></script>
				</head>
				<body class="bg-gray-100 p-8">
					<div class="max-w-4xl mx-auto">{children}</div>
				</body>
			</html>
		);
	})
);

// Home page
app.get('/', (c) => {
	return c.render(
		<div>
			<h1 class="text-3xl font-bold mb-6">Inventory Management</h1>
			<div class="grid grid-cols-2 gap-6">
				<div>
					<h2 class="text-2xl font-semibold mb-4">Categories</h2>
					<form hx-post="/categories" hx-swap="beforeend" hx-target="#categories" class="mb-4">
						<input type="text" name="name" placeholder="Category name" required class="border p-2 mr-2" />
						<button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
							Add Category
						</button>
					</form>
					<ul id="categories" hx-get="/categories" hx-trigger="load" class="list-disc pl-5"></ul>
				</div>
				<div>
					<h2 class="text-2xl font-semibold mb-4">Items</h2>
					<form hx-post="/items" hx-swap="beforeend" hx-target="#items" class="mb-4">
						<input type="text" name="name" placeholder="Item name" required class="border p-2 mr-2" />
						<input type="text" name="description" placeholder="Description" class="border p-2 mr-2" />
						<input type="number" name="category_id" placeholder="Category ID" required class="border p-2 mr-2" />
						<button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">
							Add Item
						</button>
					</form>
					<ul id="items" hx-get="/items" hx-trigger="load" class="list-disc pl-5"></ul>
				</div>
			</div>
		</div>
	);
});

// Database initialization (run this once to set up your tables)
app.get('/init', async (c) => {
	const { DB } = c.env;
	await DB.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      category_id INTEGER,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    );
  `);
	return c.text('Database initialized');
});

// Category routes
const categorySchema = z.object({
	name: z.string().min(1),
});

app.post('/categories', zValidator('json', categorySchema), async (c) => {
	const { name } = c.req.valid('json');
	const { DB } = c.env;
	const result = await DB.prepare('INSERT INTO categories (name) VALUES (?)').bind(name).run();
	return c.html(
		<li>
			{name} (ID: {result.meta.last_row_id})
		</li>
	);
});

app.get('/categories', async (c) => {
	const { DB } = c.env;
	const categories = await DB.prepare('SELECT * FROM categories').all();
	return c.html(
		<>
			{categories.results.map((category: Category) => (
				<li>
					{category.name} (ID: {category.id})
				</li>
			))}
		</>
	);
});

app.put('/categories/:id', zValidator('json', categorySchema), async (c) => {
	const id = c.req.param('id');
	const { name } = c.req.valid('json');
	const { DB } = c.env;
	await DB.prepare('UPDATE categories SET name = ? WHERE id = ?').bind(name, id).run();
	return c.json({ id, name });
});

app.delete('/categories/:id', async (c) => {
	const id = c.req.param('id');
	const { DB } = c.env;
	await DB.prepare('DELETE FROM categories WHERE id = ?').bind(id).run();
	return c.text('Category deleted');
});

// Item routes
const itemSchema = z.object({
	name: z.string().min(1),
	description: z.string().optional(),
	category_id: z.number().int().positive(),
});

app.post('/items', zValidator('json', itemSchema), async (c) => {
	const { name, description, category_id } = c.req.valid('json');
	const { DB } = c.env;
	const result = await DB.prepare('INSERT INTO items (name, description, category_id) VALUES (?, ?, ?)')
		.bind(name, description, category_id)
		.run();
	return c.html(
		<li>
			{name} - {description} (Category ID: {category_id})
		</li>
	);
});

app.get('/items', async (c) => {
	const { DB } = c.env;
	const items = await DB.prepare('SELECT * FROM items').all();
	return c.html(
		<>
			{items.results.map((item: Item) => (
				<li>
					{item.name} - {item.description} (Category ID: {item.category_id})
				</li>
			))}
		</>
	);
});

app.get('/categories/:id/items', async (c) => {
	const categoryId = c.req.param('id');
	const { DB } = c.env;
	const items = await DB.prepare('SELECT * FROM items WHERE category_id = ?').bind(categoryId).all();
	return c.json(items.results);
});

app.put('/items/:id', zValidator('json', itemSchema), async (c) => {
	const id = c.req.param('id');
	const { name, description, category_id } = c.req.valid('json');
	const { DB } = c.env;
	await DB.prepare('UPDATE items SET name = ?, description = ?, category_id = ? WHERE id = ?')
		.bind(name, description, category_id, id)
		.run();
	return c.json({ id, name, description, category_id });
});

app.delete('/items/:id', async (c) => {
	const id = c.req.param('id');
	const { DB } = c.env;
	await DB.prepare('DELETE FROM items WHERE id = ?').bind(id).run();
	return c.text('Item deleted');
});

export default app;
