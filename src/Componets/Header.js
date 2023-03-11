import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import cart from './assests/2762885.png';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteMany, DeleteOne, ADD, Search } from './redux/action/action';
import { useForm } from 'react-hook-form';
function Header() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [Price, setPrice] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const send = (item) => {
    // console.log(item);
    dispatch(ADD(item));
  };
  const getdata = useSelector((state) => state.cartreducer.carts);
  // console.log(getdata);
  const total = () => {
    let price = 0;
    getdata.map((item, id) => {
      price = item.price * item.qnty + price;
    });
    setPrice(price);
  };
  useEffect(() => {
    total();
  }, [total]);
  // delete Many
  const dlt = (id) => {
    dispatch(DeleteMany(id));
  };
  // delete one
  const dltone = (item) => {
    dispatch(DeleteOne(item));
  };
  useEffect(() => {
    return () => {
      dispatch(Search(''));
    };
  }, []);
  return (
    <>
      <p className="text-center text-red-800">
        Free Delivery on all Orders above Rs. 2,000. You may Contact us at:
        042-35880175
      </p>

      <Navbar expand="lg" className="bg-red-800">
        <Container>
          <Navbar.Brand href="#home" className="text-white">
            <img
              src="https://cdn.shopify.com/s/files/1/0143/1552/0054/files/5a1ed7444ac6b00ff574e2e9_600x.png?v=1613708111"
              alt="not found"
              className="img-fluid w-20 h-20"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto ">
              <Link to="/" className="text-decoration-none">
                <Nav.Link href="#link" className="text-white">
                  Home
                </Nav.Link>
              </Link>
              <Link to="/Men" className="text-decoration-none">
                <Nav.Link href="#link" className="text-white">
                  Men
                </Nav.Link>
              </Link>
              <Link to="/women" className="text-decoration-none">
                <Nav.Link href="#home" className="text-white">
                  Women
                </Nav.Link>
              </Link>
              <Link to="/Login" className="text-decoration-none">
                <Nav.Link href="#home" className="text-white">
                  Login
                </Nav.Link>
              </Link>
              <Link to="/Register" className="text-decoration-none">
                <Nav.Link href="#home" className="text-white">
                  Register
                </Nav.Link>
              </Link>
              <form
                onSubmit={handleSubmit((data) => {
                  if (data) {
                    dispatch(Search(data.search));
                  }
                })}
                className="search-box bg-red-800 me-md-3 flex justify-between items-center"
              >
                <input
                  type="text"
                  id="text-box"
                  {...register('search', { required: true })}
                  className="text-white ps-3"
                  placeholder="Enter Product Name ....."
                />
                <button className="search-btn px-3  ">
                  <i className="fa-solid fa-magnifying-glass py-2 "></i>
                </button>
              </form>
            </Nav>
            <Badge
              badgeContent={getdata.length}
              color="primary"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              className="cursor-pointer"
            >
              <i
                className="fa-solid fa-cart-shopping text-white cursor-pointer "
                style={{ fontSize: '30px' }}
              ></i>
            </Badge>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {getdata.length ? (
                <div
                  className="flex flex-column justify-center items-center"
                  style={{ width: '23rem' }}
                >
                  <table>
                    <thead>
                      <tr className="flex justify-content-around">
                        <th className="text-red-800">Photo</th>
                        <th className="text-red-800">Items Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getdata.map((element, id) => {
                        return (
                          <>
                            <tr className="flex justify-content-around pe-5">
                              <td>
                                <figure className="ps-4 pt-3">
                                  <img
                                    src={element.imgdata}
                                    alt="not found"
                                    srcset=""
                                    className="w-50"
                                  />
                                </figure>
                              </td>
                              <td className="pe-3">
                                <p className="text-red-800">{element.rname}</p>
                                <p className="text-red-800">
                                  Price:Rs{element.price}
                                </p>
                                <p className="text-red-800">
                                  Quanity:{element.qnty}
                                </p>
                                <div className="flex justify-around bg-red-800 items-center my-2 rounded">
                                  <span
                                    style={{ fontSize: 23 }}
                                    className="cursor-pointer text-white"
                                    onClick={() => dltone(element)}
                                  >
                                    -
                                  </span>
                                  <span
                                    style={{ fontSize: 23 }}
                                    className="cursor-pointer text-white"
                                  >
                                    {element.qnty}
                                  </span>
                                  <span
                                    style={{ fontSize: 23 }}
                                    className="cursor-pointer text-white"
                                    onClick={() => send(element)}
                                  >
                                    +
                                  </span>
                                </div>
                                <p>
                                  <i
                                    className="fas fa-trash cursor-pointer text-red-800"
                                    onClick={() => dlt(element.id)}
                                  ></i>
                                </p>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                      <p className="ps-4 text-red-800">Total:Rs{Price}</p>
                    </tbody>
                  </table>
                  <Link
                    to={`/Checkout/${Price}`}
                    className="py-2 bg-red-800 text-decoration-none px-2 text-white"
                  >
                    Check out
                  </Link>
                </div>
              ) : (
                <div
                  className="flex justify-around items-center"
                  style={{ width: '20rem' }}
                >
                  <h5 className="text-center">Your cart is Empty </h5>
                  <figure>
                    <img src={cart} alt="not found" className="w-10 h-10" />
                  </figure>
                </div>
              )}
            </Menu>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
