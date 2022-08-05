import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

/** *************************************************************
 * Any file inside the folder pages/api is mapped to /api/* and  *
 * will be treated as an API endpoint instead of a page.         *
 *************************************************************** */

// export a default function for API route to work
export default async function asynchandler(req, res) {
  console.log('OK 1');
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const query = gql`
    mutation createContact(
      $email: String!
      $subject: String!
      $content: String!
    ) {
        createContact(
        data: {
          email: $email
          subject: $subject
          content: $content
        }
      ) {
        id
      }
    }
  `;

  const result = await graphQLClient.request(query, {
    email: req.body.email,
    subject: req.body.subject,
    content: req.body.content,
  });

  return res.status(200).send(result);
}
