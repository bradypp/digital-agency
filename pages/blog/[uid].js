import PropTypes from 'prop-types';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-reactjs';

import { getPostData, getAllPostsSlug } from 'api/prismic/posts';
import { PostContent, Layout } from 'components';

export async function getStaticProps({ params, preview = false, previewData }) {
    const data = await getPostData(params.uid, previewData);

    return {
        props: {
            preview,
            blogPost: data?.blog_post ?? null,
            morePosts: data?.morePosts ?? null,
        },
    };
}

export async function getStaticPaths() {
    const data = await getAllPostsSlug();
    return {
        paths: data?.allBlog_posts?.edges?.map(({ node }) => `/blog/${node._meta.uid}`) || [],
        fallback: true,
    };
}

const BlogPost = ({ blogPost, morePosts }) => {
    const router = useRouter();

    if (router.isFallback) return <h2>Loading...</h2>;
    if (!router.isFallback && !blogPost?._meta?.uid) {
        return <ErrorPage statusCode={404} />;
    }

    const {
        title,
        body,
        _meta: { uid, firstPublicationDate },
        featured_image,
        subtitle,
        tags,
        author,
    } = blogPost;

    const titleText = RichText.asText(title);

    return (
        <Layout
            morePosts={morePosts}
            meta={{ title: titleText, description: subtitle, relativeUrl: `/blog/${uid}` }}>
            <PostContent
                titleText={titleText}
                body={body}
                firstPublicationDate={firstPublicationDate}
                featured_image={featured_image}
                subtitle={subtitle}
                tags={tags}
                author={author}
            />
        </Layout>
    );
};

BlogPost.propTypes = {
    blogPost: PropTypes.object.isRequired,
    morePosts: PropTypes.array,
};

BlogPost.defaultProps = {
    morePosts: undefined,
};

export default BlogPost;
