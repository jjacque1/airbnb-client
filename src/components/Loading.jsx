export default function Loading() {
  return (
    <div className="user-places-page">
        <h1 className="user-places-title">User Listings</h1>

        <div className="user-places-list">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="place-card skeleton-card">
              <div className="place-card-image skeleton-image"></div>

              <div className="place-card-body">
                <div className="skeleton-text skeleton-title"></div>
                <div className="skeleton-text skeleton-address"></div>
                <div className="skeleton-text skeleton-price"></div>

                <div className="skeleton-buttons">
                  <div className="skeleton-btn"></div>
                  <div className="skeleton-btn"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}
