const Navbar = () => {
  return (
    <div className="flex flex-row justify-between p-4 border-2 m-3 items-center">
      <div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-secondary w-80 max-w-xs"
        />
      </div>
      <div>
        <h4 className="font-extralight text-5xl mr-[160px]">FoodIntagram</h4>
      </div>
      <div className="avatar">
        <div className="w-12  rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src="https://placeimg.com/192/192/people" />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
