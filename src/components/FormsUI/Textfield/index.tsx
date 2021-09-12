import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";

import { addMembers } from "store/User/user.slice";
import { useAppDispatch } from "store/hook";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      "& > *": {
        margin: theme.spacing(1),
        width: "45ch"
      }
    },
    btnAdd: {
      color: "#fff",
      width: "130px",
      padding: "14px 16px",
      background: "#019376",
      border: "none",
      "&:hover": {
        backgroundColor: "#019376",
        color: "#fff",
        border: "none"
      }
    }
  })
);

interface IFormInput {
  fullname: string;
  contact: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const schema = Yup.object().shape({
  fullname: Yup.string().min(2, "Too Short!").required("Required"),
  contact: Yup.string().email().required("Required"),
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string().required("Required"),
  role: Yup.string().required("Required")
});

export default function validate() {
  const { register, control, handleSubmit } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  });
  const formSubmitHandler: SubmitHandler<IFormInput> = (data: IFormInput) => {
    alert(data);
  };
  const classes = useStyle();
  const dispatch = useAppDispatch();
  const history = useHistory();
  // const [member, setMember] = useState<IFormInput>({
  //   fullname: "",
  //   contact: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  //   role: ""
  // });

  // const handleInputChange = (e: any) => {
  //   const { value } = e.target;
  //   setMember({ ...member, [e.target.name]: value });
  // };
  // const { fullname, contact, email, password, confirmPassword, role } = member;

  // const submitForm = (data: any) => {
  //   e.preventDefault();
  //   if (member.password === member.confirmPassword) {
  //     dispatch(addMembers({ fullname, contact, email, password, role }));
  //     history.push("/admin/members");
  //   } else {
  //     alert("mat khau khong dung");
  //   }
  //   console.log(data);
  // };

  return (
    <Container maxWidth="lg" style={{ marginTop: "100px" }}>
      <Box padding="20px">
        <Typography style={{ color: "#161f6a", fontWeight: 700 }}>
          ADD Members
        </Typography>
      </Box>
      <form
        className={classes.root}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <Controller
          name="fullname"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Full Name"
              // value={fullname}
              name="fullname"
              type="text"
              variant="outlined"
              size="small"
              required
              // inputRef={register}
              // onChange={handleInputChange}
            />
          )}
        />
        {/* <TextField
          id="standard-basic"
          label="Full Name"
          // value={fullname}
          name="fullname"
          type="text"
          variant="outlined"
          size="small"
          required
          // inputRef={register}
          // onChange={handleInputChange}
        /> */}
        <Box display="flex">
          <TextField
            id="standard-basic"
            label="Contact"
            // value={contact}
            name="contact"
            type="number"
            variant="outlined"
            size="small"
            style={{ marginRight: "10px" }}
            required
            // inputRef={register}
            // onChange={handleInputChange}
          />
          <TextField
            id="standard-basic"
            label="Role"
            // value={role}
            name="role"
            type="text"
            variant="outlined"
            size="small"
            style={{ marginLeft: "10px" }}
            required
            // inputRef={register({
            //   required: "DEMO"
            // })}
            // onChange={handleInputChange}
          />
        </Box>

        <TextField
          id="standard-basic"
          label="Email"
          // value={email}
          name="email"
          type="text"
          variant="outlined"
          size="small"
          // inputRef={register}
          // onChange={handleInputChange}
        />
        <TextField
          id="standard-basic"
          label="Password"
          // value={password}
          name="password"
          type="password"
          variant="outlined"
          size="small"
          required
          // inputRef={register}
          // onChange={handleInputChange}
        />
        <TextField
          id="standard-basic"
          label="Confirm Password"
          // value={confirmPassword}
          name="confirmPassword"
          type="password"
          variant="outlined"
          size="small"
          required
          // inputRef={register}
          // onChange={handleInputChange}
        />
        <input {...register("fullname")} />
        <Box>
          <Button
            className={classes.btnAdd}
            variant="outlined"
            color="primary"
            type="submit"
            onClick={() => history.push("/admin/members")}
            style={{
              marginRight: "20px",
              color: "#fc5c63",
              background: "#fff",
              boxShadow: "0 2px 5px 1px rgb(64 60 67 / 16%)"
            }}
          >
            Cancel
          </Button>
          <Button
            className={classes.btnAdd}
            variant="outlined"
            color="primary"
            type="submit"
            // onChange={handleInputChange}
          >
            Save
          </Button>
        </Box>
      </form>
    </Container>
  );
}
