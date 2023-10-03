import { Segment, Placeholder, Card } from 'semantic-ui-react';

export default function ActivityListItemPlaceholder() {
	return (
		<Card fluid>
			<Card.Content textAlign="center">
				<Placeholder fluid style={{ marginTop: 25 }}>
					<Segment.Group>
						<Segment style={{ minHeight: 110 }}>
							<Placeholder>
								<Placeholder.Image />
							</Placeholder>
							<Placeholder>
								<Placeholder.Paragraph>
									<Placeholder.Line />
									<Placeholder.Line />
								</Placeholder.Paragraph>
							</Placeholder>
						</Segment>
						<Segment>
							<Placeholder>
								<Placeholder.Line />
								<Placeholder.Line />
								<Placeholder.Line />
							</Placeholder>
						</Segment>
						<Segment>
							<Placeholder>
								<Placeholder.Line />
							</Placeholder>
						</Segment>
					</Segment.Group>
				</Placeholder>
			</Card.Content>
		</Card>
	);
}
