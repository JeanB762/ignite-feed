import { useEffect, useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

export function Post({ author, content, publishedAt }) {
  const [comments, setComments] = useState(['Comentáro de exemplo']);
  const [newComment, setNewComment] = useState('');
  const publishDateFormated = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBr,
  });
  const publishDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBr,
    addSuffix: true,
  });

  function handleCreateNewComment(event) {
    event.preventDefault();
    setComments([...comments, newComment]);
    setNewComment('');
  }

  function handleNewCommentChange(event) {
    setNewComment(event.target.value);
    // setComments([...comments, newComment]);
  }
  useEffect(() => {
    console.log(newComment);
  }, [newComment]);

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time dateTime={publishedAt.toISOString()} title={publishDateFormated}>
          {publishDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {content.map((line, key) => {
          if (line.type === 'paragraph') {
            return <p key={key}>{line.content}</p>;
          } else if (line.type === 'link') {
            return (
              <p key={key}>
                <a href='#'>{line.content}</a>;
              </p>
            );
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu comentário</strong>
        <textarea
          name='comment'
          value={newComment}
          placeholder='Deixe um comentário'
          onChange={handleNewCommentChange}
        />
        <footer>
          <button type='submit'>Publicar</button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map((comment, key) => {
          return <Comment key={key} content={comment} />;
        })}
      </div>
    </article>
  );
}
