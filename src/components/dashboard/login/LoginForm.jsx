import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Button, VStack, Text, Input, Field, Select } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";

import { userTypes } from "./loginConfig";
import { UserContext } from "@/contexts/UserContext";
import { signIn } from "@/services/authService";

const LoginForm = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        userType: "",
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

        if (isSubmitting) return;

        setSubmitError(null);

        if (!formData.email?.trim() || !formData.password?.trim()) {
            setSubmitError("Please fill in all required fields");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setSubmitError("Please enter a valid email address");
            return;
        }

        setIsSubmitting(true);

        try {
            const signedInUser = await signIn(formData);

            if (signedInUser) {
                setUser(signedInUser);
                navigate("/dashboard/overview");

                setFormData({
                    email: "",
                    password: "",
                    userType: "",
                });
            } else {
                setSubmitError("Failed to sign in.");
            }
        } catch (err) {
            setSubmitError(err.message || "An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack p={0} align="stretch" gap={3}>
                {/* Email address */}
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

                {/* Password */}
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

                {/* User Type */}
                <Field.Root required>
                    <Field.Label label="User Type" color="white" mb={0}>
                        User Type <Field.RequiredIndicator />
                    </Field.Label>
                    <Select.Root
                        collection={userTypes}
                        m={0}
                        value={[formData.userType || ""]}
                        onValueChange={(details) => {
                            const event = {
                                target: {
                                    name: "userType",
                                    value: details.value[0] || "",
                                },
                            };
                            handleInputChange(event);
                        }}
                    >
                        <Select.HiddenSelect />
                        <Select.Control>
                            <Select.Trigger bg="whiteAlpha.100" color="white">
                                <Select.ValueText placeholder="Select user type" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                                <Select.Indicator />
                            </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                            <Select.Content>
                                {userTypes.items.map((type) => (
                                    <Select.Item
                                        item={type}
                                        key={type.value}
                                        color={"white"}
                                    >
                                        {type.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Select.Root>
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
