import React, { useContext } from "react";
import { Button, Card, Image, Icon, Label, Popup } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

const PostCard = ({
  post: {
    body,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    likes,
    comments,
  },
}) => {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Image floated="right" size="mini" src="" />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <Popup
          content="Comment on post"
          inverted
          trigger={
            <Button as="div" labelPosition="right">
              <Button basic color="blue" as={Link} to={`/posts/${id}`}>
                <Icon name="comment" />
              </Button>
              <Label as="a" basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          }
        />

        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
