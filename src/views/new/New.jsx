import React, { useEffect, useRef } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchNewPost } from "../../redux/reducers/PostSlice";
import "./styles.css";



const NewBlogPost = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.author);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  let coverUrl = useRef(null);
  let coverFile = useRef(null);
  const title = useRef(null);
  const category = useRef(null);
  const content = useRef(null);
  const time = useRef(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    let cover;
    if (coverFile.current.files[0]) {
      cover = coverFile.current.files[0];
    } else {
      cover = coverUrl.current.value;
    }
    
    const newBlog = {
      cover: cover,
      title: title.current.value,
      readTime: time.current.value,
      category: category.current.value,
      content: content.current.value,
    };
    dispatch(fetchNewPost(newBlog)).then((res) => {
      if (res.payload.statusCode === 500){
        if(res.payload.error.errors){
          toast.error("Compila tutti i campi", { position: "bottom-left" })
        }
        return
      }
      navigate('/dashboard')
    })
  }


  return (
    <div style={{ marginTop: "12em" }
    }>
      <Container className="new-blog-container">
        <Form className="mt-5" onSubmit={handleSubmit}>

          <Form.Group controlId="blog-form" className=" mt-3"><Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control size="lg" placeholder="Title" ref={title} />
          </Form.Group>

            <Form.Group controlId="blog-category" className="mt-3">
              <Form.Label >Categoria</Form.Label>
              <Form.Control ref={category} size="lg" as="select">
                <option>--  Select Category --</option>
                <option>Attualità</option>
                <option>Cultura generale</option>
                <option>Ultima ora</option>
                <option>Gossip</option>
              </Form.Control>
            </Form.Group>

            <Form.Label>Cover</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control type="file" size="lg" placeholder="Title" ref={coverFile} className="blog-form-file" />
              <p className="blog-form-or m-3">or</p>
              <Form.Control size="lg" placeholder="http://..." ref={coverUrl} className="blog-form-url" />
            </div>
          </Form.Group>

          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Read Time</Form.Label>
            <div className="d-flex">
              <Form.Control type="number" className="w-50" size="lg" placeholder="How much time for read?" ref={time} />
              <p className="m-3">   Minutes</p>
            </div>
          </Form.Group>

          <Form.Group controlId="blog-content" className="mt-3">
            <Form.Label>Contenuto Blog</Form.Label>
            <Form.Control size="lg" as="textarea" rows={10} ref={content} />
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button type="reset" size="lg" variant="outline-dark">
              Reset
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{
                marginLeft: "1em",
              }}
            >
              {loading ? <Spinner animation="border" variant="light" /> : "Submit"}
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div >
  );
};

export default NewBlogPost;
