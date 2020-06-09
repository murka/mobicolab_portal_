import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { GraphQLGatewayModule } from '@nestjs/graphql'

@Module({
  imports: [  
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLGatewayModule.forRoot({
      server: {
        cors: true,
        installSubscriptionHandlers: false,
        introspection: true,
        playground: true,
      },
      gateway: {
        serviceList: [
          { name: 'acts', url: 'http://api_acts:3002/graphql' },
          { name: 'customers', url: 'http://api_customers:3003/graphql' }
        ]
      }
    })
  ],
})
export class AppModule {}
