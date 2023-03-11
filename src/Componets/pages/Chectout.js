import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import axios from 'axios';
function Chectout() {
  const histroy = useNavigate();
  const { Price } = useParams();
  const [user, setuser] = useState({
    Country: '',
    Fname: '',
    Lname: '',
    Phone: '',
    address: '',
    state: '',
    City: '',
    code: '',
    message: '',
    Delivery: 200,
    Total: Price,
    checkbox: false,
  });
  // console.log(user);
  const carts = useSelector((state) => state.cartreducer.carts);
  // console.log(getdata);
  const handledata = (e) => {
    const { name, value } = e.target;
    if (name === 'checkbox') {
      setuser({
        ...user,
        [name]: e.target.checked,
      });
    } else {
      setuser({
        ...user,
        [name]: value,
      });
    }
  };
  const Order = (e) => {
    e.preventDefault();
    const {
      Country,
      Fname,
      Lname,
      Phone,
      address,
      state,
      City,
      code,
      message,
      Delivery,
      Total,
      checkbox,
    } = user;
    if (
      (Country,
      Fname &&
        Lname &&
        Phone &&
        address &&
        state &&
        City &&
        code &&
        message &&
        Delivery &&
        Total)
    ) {
      axios.post('http://localhost:250/Order', { user, carts }).then((res) => {
        alert(res.data.message);
        histroy('/');
      });
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="container py-5">
          <Accordion defaultActiveKey="0" className="mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>ORDER SUMARRY</Accordion.Header>
              <Accordion.Body>
                {carts.length ? (
                  <div
                    className="itemsDetails flex w-full justify-center items-center px-10"
                    style={{ width: '100%', padding: 10 }}
                  >
                    <Table className="w-100">
                      <thead>
                        <tr>
                          <th>Photo</th>
                          <th>Product Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {carts.map((item) => {
                          return (
                            <>
                              <tr>
                                <td>
                                  <Link to={`/cart/${item.id}`}>
                                    <figure>
                                      <img
                                        src={item.imgdata}
                                        alt="not found"
                                        className="img-fluid h-8 w-25"
                                      />
                                    </figure>
                                  </Link>
                                </td>
                                <td>
                                  <p>Name:{item.rname} </p>
                                  <p>Price:Rs{item.price}</p>
                                  <p>Quanity:{item.qnty}</p>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                        <p>Total:Rs{Price}</p>
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <div
                    className="itemsDetails flex w-full justify-center items-center px-10"
                    style={{ width: '100%', padding: 10 }}
                  >
                    <p className="font-bold">Your cart is empty</p>
                  </div>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Form onSubmit={Order}>
            <Form.Select
              aria-label="Default select example"
              className="mb-3"
              name="Country"
              value={user.Country}
              onChange={handledata}
            >
              <option>COUNTRY</option>
              <option value="PAKISTAN">PAKISTAN</option>
            </Form.Select>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="First Name"
                name="Fname"
                value={user.Fname}
                onChange={handledata}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Second Name"
                name="Lname"
                value={user.Lname}
                onChange={handledata}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="+92"
                name="Phone"
                value={user.Phone}
                onChange={handledata}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Address"
                name="address"
                value={user.address}
                onChange={handledata}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="State"
                name="state"
                value={user.state}
                onChange={handledata}
              />
            </Form.Group>
            <Form.Select
              aria-label="Default select example"
              className="mb-3"
              name="City"
              value={user.City}
              onChange={handledata}
            >
              <option>CITY</option>
              <option value="Lahore">Lahore</option>
              <option value="Karachi">Karachi</option>
              <option value="Quetta">Quetta</option>
              <option value="Islamabad">Islamabad</option>
            </Form.Select>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Postal Code"
                name="code"
                value={user.code}
                onChange={handledata}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Message"
                name="message"
                value={user.message}
                onChange={handledata}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Save for next time"
                name="checkbox"
                value={user.checkbox}
                onChange={handledata}
              />
            </Form.Group>
            <button type="submit" className="w-full bg-red-800 py-2 text-white">
              ORDER NOW
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Chectout;
