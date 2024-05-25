import GameItem from './GameItem';

interface GameListProps {
    games: any[];
}

const GameList: React.FC<GameListProps> = ({ games }) => {
    return (
        <div>
            {games.length === 0 ? (
                <p>No games found</p>
            ) : (
                games.map((game) => <GameItem key={game.id} game={game} />)
            )}
        </div>
    );
};

export default GameList;