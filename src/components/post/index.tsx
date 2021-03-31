import React from 'react';

// import { Container } from './styles';

interface PostProps {
  post: any;
}
const Post: React.FC<PostProps> = ({ post }) => {
  return (
    // <PostWrapper key={post.id}>
    //   <PostHeader>
    //     <Link href={`/talia/${post.id}`}>
    //       <a>
    //         <h1>{post.description}</h1>
    //       </a>
    //     </Link>
    //   </PostHeader>
    //   <PostContainer>
    //     <Link href={`/talia/${post.id}`}>
    //       <a>
    //         <img src={post.file.location} alt="Post" />
    //       </a>
    //     </Link>
    //   </PostContainer>
    //   <PostMeta>
    //     <a href="#points">0 pontos</a>
    //     {' · '}
    //     <a href="#comments">0 comentarios</a>
    //   </PostMeta>

    //   <PostInteractions>
    //     <section>
    //       <InteractionButton icon={<UpOutlined />} />
    //       <InteractionButton icon={<DownOutlined />} />
    //       <InteractionButton icon={<CommentOutlined />} />
    //       <Dropdown overlay={<MoreActions post={post} />} trigger={['click']}>
    //         <InteractionButton icon={<DashOutlined />} />
    //       </Dropdown>
    //     </section>
    //     <section>
    //       <FacebookButton
    //         icon={<FacebookFilled />}
    //         onClick={() => {
    //           FB.ui(
    //             {
    //               display: 'popup',
    //               method: 'share',
    //               href: `${getLocationOrigin()}/talia/${post.id}`,
    //             },
    //             function (response) {
    //               console.log(response);
    //             },
    //           );
    //         }}
    //       >
    //         Facebook
    //       </FacebookButton>
    //     </section>
    //   </PostInteractions>
    // </PostWrapper>
  );
};

export default Post;
