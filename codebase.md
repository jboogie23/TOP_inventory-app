# wrangler.toml

```toml
#:schema node_modules/wrangler/config-schema.json
name = "top-inventory-app"
main = "src/index.ts"
compatibility_date = "2024-07-29"
compatibility_flags = ["nodejs_compat"]

# Automatically place your workloads in an optimal location to minimize latency.
# If you are running back-end logic in a Worker, running it closer to your back-end infrastructure
# rather than the end user may result in better performance.
# Docs: https://developers.cloudflare.com/workers/configuration/smart-placement/#smart-placement
# [placement]
# mode = "smart"

# Variable bindings. These are arbitrary, plaintext strings (similar to environment variables)
# Docs:
# - https://developers.cloudflare.com/workers/wrangler/configuration/#environment-variables
# Note: Use secrets to store sensitive data.
# - https://developers.cloudflare.com/workers/configuration/secrets/
# [vars]
# MY_VARIABLE = "production_value"

# Bind the Workers AI model catalog. Run machine learning models, powered by serverless GPUs, on Cloudflare’s global network
# Docs: https://developers.cloudflare.com/workers/wrangler/configuration/#workers-ai
# [ai]
# binding = "AI"

# Bind an Analytics Engine dataset. Use Analytics Engine to write analytics within your Pages Function.
# Docs: https://developers.cloudflare.com/workers/wrangler/configuration/#analytics-engine-datasets
# [[analytics_engine_datasets]]
# binding = "MY_DATASET"

# Bind a headless browser instance running on Cloudflare's global network.
# Docs: https://developers.cloudflare.com/workers/wrangler/configuration/#browser-rendering
# [browser]
# binding = "MY_BROWSER"

# Bind a D1 database. D1 is Cloudflare’s native serverless SQL database.
# Docs: https://developers.cloudflare.com/workers/wrangler/configuration/#d1-databases
[[d1_databases]]
binding = "DB"
database_name = "top_inventory-app-db"
database_id = "1c9aedc0-7967-4a60-9e74-819fda9e5877"

# Bind a dispatch namespace. Use Workers for Platforms to deploy serverless functions programmatically on behalf of your customers.
# Docs: https://developers.cloudflare.com/workers/wrangler/configuration/#dispatch-namespace-bindings-workers-for-platforms
# [[dispatch_namespaces]]
# binding = "MY_DISPATCHER"
# namespace = "my-namespace"

# Bind a Durable Object. Durable objects are a scale-to-zero compute primitive based on the actor model.
# Durable Objects can live for as long as needed. Use these when you need a long-running "server", such as in realtime apps.
# Docs: https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects
# [[durable_objects.bindings]]
# name = "MY_DURABLE_OBJECT"
# class_name = "MyDurableObject"

# Durable Object migrations.
# Docs: https://developers.cloudflare.com/workers/wrangler/configuration/#migrations
# [[migrations]]
# tag = "v1"
# new_classes = ["MyDurableObject"]

# Bind a Hyperdrive configuration. Use to accelerate access to your existing databases from Cloudflare Workers.
# Docs: https://developers.cloudflare.com/workers/wrangler/configuration/#hyperdrive
# [[hyperdrive]]
# binding = "MY_HYPERDRIVE"
# id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Bind a KV Namespace. Use KV as persistent storage for small key-value pairs.
# Docs: https://developers.cloudflare.com/workers/wrangler/configuration/#kv-namespaces
# [[kv_namespaces]]
# binding = "MY_KV_NAMESPACE"
# id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Bind an mTLS certificate. Use to present a client certificate when communicating with another service.
# Docs: https://developers.cloudflare.com/workers/wrangler/configuration/#mtls-certificates
# [[mtls_certificates]]
# binding = "MY_CERTIFICATE"
# certificate_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

# Bind a Queue producer. Use this binding to schedule an arbitrary task that may be processed later by a Queue consumer.
# Docs: https://developers.cloudflare.com/workers/wrangler/configuration/#queues
# [[queues.producers]]
# binding = "MY_QUEUE"
# queue = "my-queue"

# Bind a Queue consumer. Queue Consumers can retrieve tasks scheduled by Producers to act on them.
# Docs: https://developers.cloudflare.com/workers/wrangler/configuration/#queues
# [[queues.consumers]]
# queue = "my-queue"

# Bind an R2 Bucket. Use R2 to store arbitrarily large blobs of data, such as files.
# Docs: https://developers.cloudflare.com/workers/wrangler/configuration/#r2-buckets
# [[r2_buckets]]
# binding = "MY_BUCKET"
# bucket_name = "my-bucket"

# Bind another Worker service. Use this binding to call another Worker without network overhead.
# Docs: https://developers.cloudflare.com/workers/wrangler/configuration/#service-bindings
# [[services]]
# binding = "MY_SERVICE"
# service = "my-service"

# Bind a Vectorize index. Use to store and query vector embeddings for semantic search, classification and other vector search use-cases.
# Docs: https://developers.cloudflare.com/workers/wrangler/configuration/#vectorize-indexes
# [[vectorize]]
# binding = "MY_INDEX"
# index_name = "my-index"

```

# worker-configuration.d.ts

```ts
// Generated by Wrangler
// After adding bindings to `wrangler.toml`, regenerate this interface via `npm run cf-typegen`
interface Env {
}

```

# vitest.config.mts

```mts
import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config';

export default defineWorkersConfig({
	test: {
		poolOptions: {
			workers: {
				wrangler: { configPath: './wrangler.toml' },
			},
		},
	},
});

```

# tsconfig.json

```json
{
	"compilerOptions": {
		/* Visit https://aka.ms/tsconfig.json to read more about this file */

		/* Projects */
		// "incremental": true,                              /* Enable incremental compilation */
		// "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
		// "tsBuildInfoFile": "./",                          /* Specify the folder for .tsbuildinfo incremental compilation files. */
		// "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects */
		// "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
		// "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

		/* Language and Environment */
		"target": "es2021" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
		"lib": ["es2021"] /* Specify a set of bundled library declaration files that describe the target runtime environment. */,
		"jsx": "react-jsx" /* Specify what JSX code is generated. */,
		// "experimentalDecorators": true,                   /* Enable experimental support for TC39 stage 2 draft decorators. */
		// "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
		// "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h' */
		// "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
		"jsxImportSource": "hono/jsx" /* Specify module specifier used to import the JSX factory functions when using `jsx: react-jsx*`.` */,
		// "reactNamespace": "",                             /* Specify the object invoked for `createElement`. This only applies when targeting `react` JSX emit. */
		// "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
		// "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */

		/* Modules */
		"module": "es2022" /* Specify what module code is generated. */,
		// "rootDir": "./",                                  /* Specify the root folder within your source files. */
		"moduleResolution": "Bundler" /* Specify how TypeScript looks up a file from a given module specifier. */,
		// "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
		// "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
		// "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
		// "typeRoots": [],                                  /* Specify multiple folders that act like `./node_modules/@types`. */
		"types": [
			"@cloudflare/workers-types/2023-07-01"
		] /* Specify type package names to be included without being referenced in a source file. */,
		// "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
		"resolveJsonModule": true /* Enable importing .json files */,
		// "noResolve": true,                                /* Disallow `import`s, `require`s or `<reference>`s from expanding the number of files TypeScript should add to a project. */

		/* JavaScript Support */
		"allowJs": true /* Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files. */,
		"checkJs": false /* Enable error reporting in type-checked JavaScript files. */,
		// "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from `node_modules`. Only applicable with `allowJs`. */

		/* Emit */
		// "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
		// "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
		// "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
		// "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
		// "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If `declaration` is true, also designates a file that bundles all .d.ts output. */
		// "outDir": "./",                                   /* Specify an output folder for all emitted files. */
		// "removeComments": true,                           /* Disable emitting comments. */
		"noEmit": true /* Disable emitting files from a compilation. */,
		// "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
		// "importsNotUsedAsValues": "remove",               /* Specify emit/checking behavior for imports that are only used for types */
		// "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
		// "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
		// "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
		// "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
		// "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
		// "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
		// "newLine": "crlf",                                /* Set the newline character for emitting files. */
		// "stripInternal": true,                            /* Disable emitting declarations that have `@internal` in their JSDoc comments. */
		// "noEmitHelpers": true,                            /* Disable generating custom helper functions like `__extends` in compiled output. */
		// "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
		// "preserveConstEnums": true,                       /* Disable erasing `const enum` declarations in generated code. */
		// "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */
		// "preserveValueImports": true,                     /* Preserve unused imported values in the JavaScript output that would otherwise be removed. */

		/* Interop Constraints */
		"isolatedModules": true /* Ensure that each file can be safely transpiled without relying on other imports. */,
		"allowSyntheticDefaultImports": true /* Allow 'import x from y' when a module doesn't have a default export. */,
		// "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility. */,
		// "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
		"forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,

		/* Type Checking */
		"strict": true /* Enable all strict type-checking options. */,
		// "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied `any` type.. */
		// "strictNullChecks": true,                         /* When type checking, take into account `null` and `undefined`. */
		// "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
		// "strictBindCallApply": true,                      /* Check that the arguments for `bind`, `call`, and `apply` methods match the original function. */
		// "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
		// "noImplicitThis": true,                           /* Enable error reporting when `this` is given the type `any`. */
		// "useUnknownInCatchVariables": true,               /* Type catch clause variables as 'unknown' instead of 'any'. */
		// "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
		// "noUnusedLocals": true,                           /* Enable error reporting when a local variables aren't read. */
		// "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read */
		// "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
		// "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
		// "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
		// "noUncheckedIndexedAccess": true,                 /* Include 'undefined' in index signature results */
		// "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
		// "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type */
		// "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
		// "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

		/* Completeness */
		// "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
		"skipLibCheck": true /* Skip type checking all .d.ts files. */
	},
	"exclude": ["test"],
	"include": ["worker-configuration.d.ts", "src/**/*.ts"]
}

```

# package.json

```json
{
  "name": "top-inventory-app",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "deploy": "wrangler deploy",
    "dev": "wrangler dev",
    "start": "wrangler dev",
    "test": "vitest",
    "cf-typegen": "wrangler types"
  },
  "devDependencies": {
    "@cloudflare/vitest-pool-workers": "^0.4.5",
    "@cloudflare/workers-types": "^4.20240729.0",
    "typescript": "^5.5.2",
    "vitest": "1.5.0",
    "wrangler": "^3.60.3"
  },
  "dependencies": {
    "@hono/zod-validator": "^0.2.2",
    "hono": "^4.5.3",
    "zod": "^3.23.8"
  }
}

```

# .prettierrc

```
{
	"printWidth": 140,
	"singleQuote": true,
	"semi": true,
	"useTabs": true
}

```

# .gitignore

```
# Logs

logs
_.log
npm-debug.log_
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
.pnpm-debug.log*

# Diagnostic reports (https://nodejs.org/api/report.html)

report.[0-9]_.[0-9]_.[0-9]_.[0-9]_.json

# Runtime data

pids
_.pid
_.seed
\*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover

lib-cov

# Coverage directory used by tools like istanbul

coverage
\*.lcov

# nyc test coverage

.nyc_output

# Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)

.grunt

# Bower dependency directory (https://bower.io/)

bower_components

# node-waf configuration

.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)

build/Release

# Dependency directories

node_modules/
jspm_packages/

# Snowpack dependency directory (https://snowpack.dev/)

web_modules/

# TypeScript cache

\*.tsbuildinfo

# Optional npm cache directory

.npm

# Optional eslint cache

.eslintcache

# Optional stylelint cache

.stylelintcache

# Microbundle cache

.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history

.node_repl_history

# Output of 'npm pack'

\*.tgz

# Yarn Integrity file

.yarn-integrity

# dotenv environment variable files

.env
.env.development.local
.env.test.local
.env.production.local
.env.local

# parcel-bundler cache (https://parceljs.org/)

.cache
.parcel-cache

# Next.js build output

.next
out

# Nuxt.js build / generate output

.nuxt
dist

# Gatsby files

.cache/

# Comment in the public line in if your project uses Gatsby and not Next.js

# https://nextjs.org/blog/next-9-1#public-directory-support

# public

# vuepress build output

.vuepress/dist

# vuepress v2.x temp and cache directory

.temp
.cache

# Docusaurus cache and generated files

.docusaurus

# Serverless directories

.serverless/

# FuseBox cache

.fusebox/

# DynamoDB Local files

.dynamodb/

# TernJS port file

.tern-port

# Stores VSCode versions used for testing VSCode extensions

.vscode-test

# yarn v2

.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.\*

# wrangler project

.dev.vars
.wrangler/

```

# .editorconfig

```
# http://editorconfig.org
root = true

[*]
indent_style = tab
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.yml]
indent_style = space

```

# test/tsconfig.json

```json
{
	"extends": "../tsconfig.json",
	"compilerOptions": {
		"types": ["@cloudflare/workers-types/experimental", "@cloudflare/vitest-pool-workers"]
	},
	"include": ["./**/*.ts", "../src/env.d.ts"],
	"exclude": []
}

```

# test/index.spec.ts

```ts
// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('Hello World worker', () => {
	it('responds with Hello World! (unit style)', async () => {
		const request = new IncomingRequest('http://example.com');
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`);
	});

	it('responds with Hello World! (integration style)', async () => {
		const response = await SELF.fetch('https://example.com');
		expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`);
	});
});

```

# src/index.ts

```ts
/** @jsx jsx */
/** @jsxFrag Fragment */
import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';
import { jsx, Fragment } from 'hono/jsx';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

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
	jsxRenderer(({ children }) => (
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
	))
);

// Home page
app.get('/', (c) => (
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
));

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
				<li key={category.id}>
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
				<li key={item.id}>
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

```

# src/db/schema.sql

```sql
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
```

