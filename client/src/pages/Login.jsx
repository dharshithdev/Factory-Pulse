import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            const data = await loginService({
                username,
                password
            });

            login(
                data.admin,
                data.token
            );

            navigate("/");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Login failed."
            );

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">

            <form
                onSubmit={handleSubmit}
                className="bg-[#1E293B] p-10 rounded-2xl w-full max-w-md border border-slate-700"
            >

                <h1 className="text-3xl font-bold text-white mb-8 text-center">

                    FactoryPulse Admin

                </h1>

                {error && (
                    <p className="text-red-400 mb-4 text-center">
                        {error}
                    </p>
                )}

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="w-full mb-4 p-3 rounded-lg bg-slate-800 text-white outline-none"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full mb-6 p-3 rounded-lg bg-slate-800 text-white outline-none"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
                >

                    Login

                </button>

            </form>

        </div>

    );

}

export default Login;