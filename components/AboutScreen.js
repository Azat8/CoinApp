import React from "react";
import HeaderComponent from './HeaderComponent';
import { Container, Text, Body, Content, Card, CardItem } from "native-base";

export class AboutScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <HeaderComponent {...this.props} />
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text style={{ color: 'black' }}>About Cryptocurrency</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  Decentralized cryptocurrency is produced by the entire cryptocurrency system collectively, at a rate which is defined when the system is created and which is publicly known. In centralized banking and economic systems such as the Federal Reserve System, corporate boards or governments control the supply of currency by printing units of fiat money or demanding additions to digital banking ledgers. In case of decentralized cryptocurrency, companies or governments cannot produce new units, and have not so far provided backing for other firms, banks or corporate entities which hold asset value measured in it. The underlying technical system upon which decentralized cryptocurrencies are based was created by the group or individual known as Satoshi Nakamoto.
                  As of May 2018, over 1,800 cryptocurrency specifications existed. Within a cryptocurrency system, the safety, integrity and balance of ledgers is maintained by a community of mutually distrustful parties referred to as miners: who use their computers to help validate and timestamp transactions, adding them to the ledger in accordance with a particular timestamping scheme.
                  Most cryptocurrencies are designed to gradually decrease production of that currency, placing a cap on the total amount of that currency that will ever be in circulation. Compared with ordinary currencies held by financial institutions or kept as cash on hand, cryptocurrencies can be more difficult for seizure by law enforcement. This difficulty is derived from leveraging cryptographic technologies.
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
