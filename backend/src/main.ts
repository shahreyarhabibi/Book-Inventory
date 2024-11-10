import { NestFactory } from '@nestjs/core'; // Import NestFactory to create the application
import { AppModule } from './app.module'; // Import the main application module
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // Import Swagger modules for API documentation

async function bootstrap() {
  // Create the Nest application using the AppModule
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  });

  // Set up Swagger for API documentation
  const config = new DocumentBuilder()
    .setTitle('Book Management API') // Set the title of the API
    .setDescription('API for managing a book inventory system') // Set the description of the API
    .setVersion('1.0') // Set the version of the API
    .build(); // Build the configuration

  // Create the Swagger document
  const document = SwaggerModule.createDocument(app, config);
  // Set up the Swagger UI at the specified route
  SwaggerModule.setup('api-docs', app, document);

  // Start the application and listen on port 3001
  await app.listen(3001);
}

// Call the bootstrap function to start the application
bootstrap();
