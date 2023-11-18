const BlogFullContentPageClient = ({ data }) => {
  return (
    <div className="publdet-content">
      <h2 className="title title-h2">{data && data?.title}</h2>
      <div
        dangerouslySetInnerHTML={{ __html: data && data?.body_text }}
        className={
          data && data?.id === 4
            ? `inner-html inner-html__grid grid grid-3`
            : `inner-html`
        }
      />
    </div>
  );
};

export default BlogFullContentPageClient;
