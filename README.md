# Book API

This repository contains Lambda functions for a Book API.

## Functions

- **createBook**: Lambda function to create a new book in the database. Requires the following permissions:
  - `dynamodb:PutItem` for writing to the database.

- **deleteBook**: Lambda function to delete a book from the database. Requires the following permissions:
  - `dynamodb:DeleteItem` for deleting items from the database.

- **getBook**: Lambda function to retrieve a specific book from the database. Requires the following permissions:
  - `dynamodb:GetItem` for reading items from the database.

- **getBooks**: Lambda function to retrieve all books from the database. Requires the following permissions:
  - `dynamodb:ScanItem` for scanning the database.

- **updateBook**: Lambda function to update an existing book in the database. Requires the following permissions:
  - `dynamodb:UpdateItem` for updating items in the database.
