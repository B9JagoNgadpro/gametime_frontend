import Logout from "@/components/logout/Logout";
import ForgetPassword from "../../components/login/ForgetPassword";
import LoginPage from "../../components/login/LoginPage";
import Layout from '../../layout/layout';

const Login= ()=>{
    return(
        <Layout>
            <LoginPage/>
            <ForgetPassword/>
        </Layout>
    )
   
};
export default Login;