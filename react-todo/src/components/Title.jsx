import { H1 } from "./TitleStyled";

const Title = ({user}) => <H1>{user ? `${user}'s Task List` : 'Task List'}</H1>;

export default Title;
