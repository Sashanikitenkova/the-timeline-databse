const postModel = require('../models/postModel');

const post = (req, res) => {
  postModel.find()
    .then(result => {
      res.render('index', { title: 'Posts', posts: result, errorMessage: null });
    })
    .catch(err => {
      console.log(err);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Could not load posts. Please try again later.'
      });
    })
};

const addNewPost = async (req, res) => {
  const postText = req.body.post;

  if (!postText || postText.length < 25) {
    const posts = await postModel.find().sort({ createdAt: -1 });
    return res.render('index', {
      title: 'Posts',
      posts: posts,
      errorMessage: 'Post must be at least 25 characters long.'
    });
  }

  const newPost = new postModel({ post: postText });

  newPost.save()
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Server error');
    });
};

const showPost = (req, res) => {
  const postId = req.params.id;
  console.log(postId);

  postModel.findById(postId)
     .then(result => {
       res.render('post', { title: 'Post', post: result, errorMessage: null });
     })
     .catch(err => {
      console.log(arr);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Could not load post. Please try again later.'
      });
     })
}

const deletePost = (req, res) => {
  const postId = req.params.id;

  postModel.findByIdAndDelete(postId)
     .then(() => {
      res.redirect('/');
     })
     .catch(err => {
      console.log(err);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Could not delete post. Please try again later.'
      });
     })

}

const editPostPage = (req, res) => {
  const postId = req.params.id;

  postModel.findById(postId)
    .then(result => {
      res.render('edit-post', { title: 'Edit Post', post: result, errorMessage: null })
     })
    .catch(err => {
      console.log(err);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Could not load post for editing.'
      });
    })
}

const editPostForm = (req, res) => {
  const postId = req.params.id;

  postModel.findByIdAndUpdate(postId, {
      post: req.body.post,
      updatedAt: new Date()
    }, { new: true })
    .then(() => {
      res.redirect('/'); 
    })
    .catch(err => {
      console.error(err);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Could not update post. Please try again later.'
      });
    });   
}

const notFoundPage = (req,res) => {
  res.send('404, Page not found');
}

module.exports = { 
  post,
  addNewPost,
  showPost,
  deletePost,
  editPostPage,
  editPostForm,
  notFoundPage,
};




// const addNewPost = (req, res) => {
//   let newPost = new postModel(req.body);

//   newPost.save()
//     .then(savedPost => {
//       // const formattedDate = new Date(savedPost.createdAt).toLocaleDateString('en-US', {
//       //   day: 'numeric',
//       //   month: 'long',
//       //   year: 'numeric'
//       // });
      
//       // console.log({
//       //   post: savedPost.post,
//       //   createdAt: formattedDate
//       // });

//       res.redirect('/');
//     })
//     // .catch(err => {
//     //   console.log(err);
//     // })
//     .catch(async (err) => {
//       if (err.name === 'ValidationError') {
//         const posts = await postModel.find().sort({ createdAt: -1 });
        
//         res.render('index', {
//           title: 'Posts',
//           posts: posts,
//           errorMessage: err.errors.post.message,
//         });
//       } else {
//         res.status(500).send('Server error');
//       }
//     });
// }