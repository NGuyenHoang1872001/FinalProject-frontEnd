const PersonLikedPost = (liked) => {
  console.log(
    "🚀 ~ file: PersonLikedPost.js ~ line 2 ~ PersonLikedPost ~ liked",
    liked
  );
  const personLike = liked.liked;
  return (
    <div>
      {personLike && personLike > 3 ? (
        <div class="avatar-group -space-x-6">
          <div class="avatar">
            <div class="w-8">
              <img src="https://placeimg.com/192/192/people" />
            </div>
          </div>
          <div class="avatar">
            <div class="w-8">
              <img src="https://placeimg.com/192/192/people" />
            </div>
          </div>
          <div class="avatar">
            <div class="w-8">
              <img src="https://placeimg.com/192/192/people" />
            </div>
          </div>
          <div class="avatar placeholder">
            <div class="w-8 bg-neutral-focus text-neutral-content">
              <span>+{personLike - 3}</span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div class="avatar-group -space-x-6 m-5">
            <div class="avatar">
              <div class="w-8">
                <img src="https://placeimg.com/192/192/people" />
              </div>
            </div>

            <div class="avatar placeholder">
              <div class="w-8 bg-neutral-focus text-neutral-content">
                <span>+{personLike}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PersonLikedPost;
