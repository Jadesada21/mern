import {
  Authenticated,
  AuthProvider,
  GitHubBanner,
  Refine,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  RefineSnackbarProvider,
  ThemedLayout,
  useNotificationProvider,
} from "@refinedev/mui";

import DashboardIcon from '@mui/icons-material/Dashboard';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ChatIcon from '@mui/icons-material/Chat';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';

import Title from "./components/title"
// import { theme } from "./theme/theme"
// import { ThemeProvider } from "@mui/material/styles";
import { Sider } from "./components/layout/sider"

import {
  Agent,
  AgentProfile,
  AllProperties,
  CreateProperties,
  EditProperties,
  Home,
  PropertyDetail
} from "./pages"

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import axios from "axios";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { CredentialResponse } from "./interfaces/google";

import { Login } from "./pages/login";
import { dataProvider } from "./providers/data";
import { parseJwt } from "./utils/parse-jwt";


const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

function App() {
  const authProvider: AuthProvider = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...profileObj,
            avatar: profileObj.picture,
          })
        );

        localStorage.setItem("token", `${credential}`);

        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
      };
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  return (
    <BrowserRouter>
      {/* <GitHubBanner /> */}
      < RefineKbarProvider >
        <ColorModeContextProvider>
          {/* <ThemeProvider > */}
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerProvider}
                authProvider={authProvider}
                resources={[
                  {
                    name: "dashboard",
                    list: "/home",
                    meta: {
                      icon: <DashboardIcon />
                    }
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                  },
                  {
                    name: "properties",
                    list: "/home",
                    meta: {
                      icon: <MapsHomeWorkIcon />
                    }
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                  },
                  {
                    name: "agent",
                    list: "/home",
                    meta: {
                      icon: <SupportAgentIcon />
                    }
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                  },
                  {
                    name: "reviews",
                    list: "/home",
                    meta: {
                      icon: <ReviewsIcon />
                    }
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                  },
                  {
                    name: "messages",
                    list: "/home",
                    meta: {
                      icon: <ChatIcon />
                    }
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                  },
                  {
                    name: "myProfile",
                    list: "/home",
                    meta: {
                      icon: <SwitchAccountIcon />
                    }
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                  },

                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: "240zfW-9QxyID-4RYZUP",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayout
                          Header={Header}
                          Title={Title}
                          Sider={Sider}
                        >
                          <Outlet />
                        </ThemedLayout>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="Dashboard" />}
                    />
                    <Route path="/home">
                      <Route index element={<Home />} />
                    </Route>



                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}>
                        {/* <NavigateToResource /> */}
                      </Authenticated>
                    }
                  >
                    {/* <Route path="/login" element={<Login />} /> */}
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </RefineSnackbarProvider >
          {/* </ThemeProvider > */}
        </ColorModeContextProvider >
      </RefineKbarProvider >
    </BrowserRouter >
  );
}

export default App;



