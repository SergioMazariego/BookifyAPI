import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event, context) => {
    try {
        // Extract the book ID from the request event
        const bookId = event.pathParameters.id;

        // Call DynamoDB's getCommand to retrieve the book by its ID
        const { Item } = await ddbDocClient.send(new GetCommand({
            TableName: "books",
            Key: {
                id: bookId
            }
        }));

        return {
            statusCode: 200,
            body: JSON.stringify(Item),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};
