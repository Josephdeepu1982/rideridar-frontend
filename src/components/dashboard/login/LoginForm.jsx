import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, VStack, Text, Input, Field } from "@chakra-ui/react";
import {
    PasswordInput,
    PasswordStrengthMeter,
} from "@/components/ui/password-input";

import { UserContext } from "@/contexts/UserContext";

const LoginForm = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (submitError) setSubmitError(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // if (isSubmitting) return;

        // setSubmitError(null);

        // if (!loginData.email?.trim() || !loginData.password?.trim()) {
        //     setSubmitError("Please fill in all required fields");
        //     return;
        // }

        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!emailRegex.test(loginData.email)) {
        //     setSubmitError("Please enter a valid email address");
        //     return;
        // }

        // setIsSubmitting(true);

        // try {
        //     const response = await addDriver({
        //         ...loginData,
        //         // password: passwordGenerator(), // use this if you auto-gen passwords
        //         jwt: "wkkw",
        //     });

        //     if (response.ok) {
        //         console.log("Driver created successfully.");

        //         setLoginData({
        //             email: "",
        //             password: "",
        //         });

        //         if (onSuccess) onSuccess();
        //         alert("Driver added successfully!");
        //     } else {
        //         setSubmitError("Failed to create driver");
        //     }
        // } catch (err) {
        //     setSubmitError(err.message || "An unexpected error occurred");
        // } finally {
        //     setIsSubmitting(false);
        // }
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack p={0} align="stretch" gap={3}>
                <Field.Root p={0} required>
                    <Field.Label color="white" mb={0}>
                        Email Address <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                        name="email"
                        type="email"
                        value={formData.email || ""}
                        onChange={handleInputChange}
                        placeholder="Enter email address"
                    />
                </Field.Root>

                <Field.Root p={0} required>
                    <Field.Label color="white" mb={0}>
                        Password <Field.RequiredIndicator />
                    </Field.Label>
                    <PasswordInput
                        name="password"
                        value={formData.password || ""}
                        onChange={handleInputChange}
                        placeholder="Enter password"
                    />
                </Field.Root>

                <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    isLoading={isSubmitting}
                    loadingText="Logging in..."
                    mt={4}
                >
                    Sign In
                </Button>

                {submitError && (
                    <Text color="red.500" textAlign="center">
                        {submitError}
                    </Text>
                )}
            </VStack>
        </form>
    );
};

export default LoginForm;
