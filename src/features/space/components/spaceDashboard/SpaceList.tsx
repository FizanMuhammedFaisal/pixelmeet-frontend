const spaces = []
function SpaceList() {
   return (
      <div className="mt-20">
         {spaces.length === 0 && <div>There is not space that you have created yet</div>}
      </div>
   )
}

export default SpaceList
