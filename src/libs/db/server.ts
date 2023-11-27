import { ApolloServer } from '@apollo/server';
import { loadFiles } from '@graphql-tools/load-files';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from '../../graphql/resolvers';
import { TablesSyncAll } from '@libs/setup/initialsetup';
//Server Start
export async function ServerStart() {
  //Table Start and create registers
  TablesSyncAll();
  const server = new ApolloServer({
    typeDefs: await loadFiles('./src/**/*.graphql'),
    resolvers,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`Server ready at: ${url}`);
}
