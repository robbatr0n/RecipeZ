import { observer } from 'mobx-react-lite';
import { Header, Menu } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function ActivityFilters() {
	const {
		recipeStore: { predicate, setPredicate },
	} = useStore();
	return (
		<>
			<Menu vertical size="large" style={{ width: '100%', marginTop: 25 }}>
				<Header icon="filter" attached color="teal" content="Filters" />
				<Menu.Item content="All Activites" active={predicate.has('all')} onClick={() => setPredicate('all', 'true')} />
				<Menu.Item
					content="Breakfast"
					active={predicate.has('isBreakfast')}
					onClick={() => setPredicate('isBreakfast', 'true')}
				/>
				<Menu.Item content="Lunch" active={predicate.has('isLunch')} onClick={() => setPredicate('isLunch', 'true')} />
				<Menu.Item
					content="Dinner"
					active={predicate.has('isDinner')}
					onClick={() => setPredicate('isDinner', 'true')}
				/>
			</Menu>
		</>
	);
});
