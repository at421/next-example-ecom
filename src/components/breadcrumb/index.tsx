const Breadcrumb = () => (
  <section className="breadcrumb">
    <div className="container">
      <ul className="breadcrumb-list">
        <li>
          {/* Assuming the home link should point to the root of the app */}
          <a href="/">
            <i className="icon-home" />
          </a>
        </li>
        {/* This part is likely static or should be dynamic based on context */}
        <li>All Products</li>
      </ul>
    </div>
  </section>
);

export default Breadcrumb;