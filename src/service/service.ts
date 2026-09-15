import axios from "axios";

const baseUrl = import.meta.env["VITE_API_BASE_URL"];
const requestTimeout = 10000;
const healthCheckTimeout = 5000;

export const apiClient = axios.create({
  baseURL: baseUrl,
  timeout: requestTimeout,
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

export const checkBackendAvailability = async () => {
  try {
    await apiClient.get("/api/health", {
      timeout: healthCheckTimeout,
    });
  } catch (error) {
    let message = "The contact service could not be reached. Please try again shortly.";

    if (axios.isAxiosError(error)) {
      console.error("Contact service health check failed", {
        status: error.response?.status,
        message: error.message,
      });

      if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
        message = "The contact service is starting up. Please try again in a few seconds.";
      } else if (error.response) {
        message = "The contact service is unavailable. Please try again shortly.";
      }
    } else {
      console.error("Unexpected contact service health check error", error);
    }

    throw new Error(message);
  }
};

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

      if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
        throw new Error("The contact service took too long to respond. Please try again.");
      }

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
