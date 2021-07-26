import React, { useEffect, useState } from "react";
import { Comment, Icon } from "semantic-ui-react";
import calculateTime from "../../utils/calculateTime";

const PostComments = () => {
  const [disabled, setDisabled] = useState(false);

  return (
    <Comment.Group>
      <Comment>
        <Comment.Avatar src={comment.user.profilePicUrl} />
        <Comment.Content>
          <Comment.Author as="a" href={`/${comment.user.username}`}>
            {comment.user.name}
          </Comment.Author>
          <Comment.Metadata>{calculateTime(comment.date)}</Comment.Metadata>
          <Comment.Text>{comment.text}</Comment.Text>
          <Comment.Actions>
            <Comment.Action></Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    </Comment.Group>
  );
};

export default PostComments;
