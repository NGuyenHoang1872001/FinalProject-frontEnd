const Avata = (width) => {
  return (
    <div>
      <div className="avatar">
        <div
          // className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
          className={width.width}
        >
          <img src="https://placeimg.com/192/192/people" />
        </div>
      </div>
    </div>
  );
};
export default Avata;
