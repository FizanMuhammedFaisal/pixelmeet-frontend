import EmptySpace from './EmptySpace'

const spaces = []
function SpaceList() {
   return <div className="mt-20">{spaces.length === 0 && <EmptySpace />}</div>
}

export default SpaceList
