import React from 'react';
import { Segment, SegmentGroup } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import { observer } from 'mobx-react-lite';

interface Props {
	profile: Profile;
}

export default observer(function ProfileContent({ profile }: Props) {
	return (
		<SegmentGroup>
			<Segment.Group className="white-bg" horizontal>
				<Segment>
					<h2>Bio</h2>
					<p>Up and coming chef from Chicago looking to share my recipes with the world!</p>
				</Segment>
			</Segment.Group>
			<Segment.Group className="white-bg" horizontal></Segment.Group>
		</SegmentGroup>
	);
});
