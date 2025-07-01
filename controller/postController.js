const postModel = require('../models/postModel');

const post = (req, res) => {
  postModel.find()
    .then(result => {
      res.render('index', { title: 'Posts', posts: result });
    })
    .catch(err => {
      console.log(err);
    })
};

const addNewPost = (req, res) => {
  let newPost = new postModel(req.body);

  newPost.save()
    .then(savedPost => {
      // const formattedDate = new Date(savedPost.createdAt).toLocaleDateString('en-US', {
      //   day: 'numeric',
      //   month: 'long',
      //   year: 'numeric'
      // });
      
      // console.log({
      //   post: savedPost.post,
      //   createdAt: formattedDate
      // });

      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    })
    // .catch(async (err) => {
    //   if (err.name === 'ValidationError') {
    //     const posts = await postModel.find().sort({ createdAt: -1 });
        
    //     res.render('index', {
    //       posts: posts,
    //       errorMessage: err.errors.post.message,
    //       title: 'Timeline - Add Post Error'
    //     });
    //   } else {
    //     res.status(500).send('Server error');
    //   }
    // });
}

const showPost = (req, res) => {
  const postId = req.params.id;
  console.log(postId);

  postModel.findById(postId)
     .then(result => {
       res.render('post', { title: 'Post', post: result });
     })
     .catch(err => {
      console.log(arr);
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
     })

}

const editPostPage = (req, res) => {
  const postId = req.params.id;

  postModel.findById(postId)
    .then(result => {
      res.render('edit-post', { title: 'Edit Post', post: result })
     })
    .catch(err => {
      console.log(err);
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