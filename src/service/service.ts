import axios from "axios";

const baseUrl = import.meta.env["VITE_API_BASE_URL"];

export const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

interface ISendMail {
  name: string;
  email: string;
  message: string;
}

export interface ContactValidationError {
  field: string;
  message: string;
}

export class ContactRequestError extends Error {
  errors: ContactValidationError[];

  constructor(message: string, errors: ContactValidationError[] = []) {
    super(message);
    this.name = "ContactRequestError";
    this.errors = errors;
  }
}

export const sendMail = async (data: ISendMail) => {
  try {
    const response = await apiClient.post("/api/contact", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Contact form request failed", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      if (error.response?.status === 404) {
        throw new Error("The contact service is unavailable.");
      }

      if (error.response?.status === 422) {
        const responseData = error.response.data as {
          message?: string;
          errors?: ContactValidationError[];
        };

        throw new ContactRequestError(
          responseData.message ?? "Please check the submitted fields.",
          responseData.errors,
        );
      }

      throw new Error("Unable to connect to the contact service.");
    }

    console.error("Unexpected contact form error", error);
    throw new Error("Something went wrong. Please try again.");
  }
};
