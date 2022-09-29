import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../redux/reducers/authXer";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input, Button } from "../components/forms";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    dispatch(
      login({
        user: {
          username: data.username,
        },
      })
    );

    navigate("/");
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen p-2 overflow-hidden">
      <div className="w-80">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register("username")}
            required={true}
            type={"text"}
            disabled={false}
            name={"username"}
            label={"Username"}
            placeholder={"Username"}
            error={errors.username?.message?.toString()}
          />
          <Button
            variant={"primary"}
            type={"submit"}
            disabled={false}
            label={"Log in"}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
