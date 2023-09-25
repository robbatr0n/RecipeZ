import { observer } from "mobx-react-lite";
import { Container, Header, Segment, Image } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer(function HomePage() {
  const { modalStore } = useStore();
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
      </Container>
    </Segment>
  );
});
