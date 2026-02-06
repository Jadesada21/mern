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

import InsertPageBreakIcon from '@mui/icons-material/InsertPageBreak';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ChatIcon from '@mui/icons-material/Chat';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';

import Title from "./components/title"
// import { theme } from "./theme/theme"
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Sider } from "./components/layout/sider"


import {
  Agent,
  AgentProfile,
  AllProperties,
  CreateProperties,
  // EditProperties,
  Home,
  PropertyDetail,
  Review,
  Message,
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
import { Profile } from "./components";
import { title } from "process";
import { dividerClasses } from "@mui/material";


const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          fontWeight: 700,
        },
      },
    },
  },
});

function App() {
  const authProvider: AuthProvider = {


    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        const res = await fetch("http://localhost:8080/api/v1/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: profileObj.name,
            email: profileObj.email,
            avatar: profileObj.picture
          })
        })

        const data = await res.json()

        if (res.status === 200) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userid: data._id
            })
          );
        }

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
        // logout: true,
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
          <ThemeProvider theme={theme} >
            <CssBaseline />
            <GlobalStyles styles={{
              html: { WebkitFontSmoothing: "auto" },
            }} />
            <RefineSnackbarProvider>
              {/* <DevtoolsProvider> */}
              <Refine
                dataProvider={dataProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerProvider}
                authProvider={authProvider}
                resources={[

                  {
                    name: "home",
                    list: "/home",
                    meta: {
                      label: "Dashboard",
                      icon: <InsertPageBreakIcon />,
                    },
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                  },
                  {
                    name: "properties",
                    list: "/properties",
                    meta: {
                      icon: <MapsHomeWorkIcon />
                    },
                    create: "/properties/create",
                    show: "/properties/show/:id",
                    edit: "/properties/edit/:id",
                  },
                  {
                    name: "agent",
                    list: "/agent",
                    meta: {
                      icon: <SupportAgentIcon />
                    }
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                  },
                  {
                    name: "reviews",
                    list: "/reviews",
                    meta: {
                      icon: <ReviewsIcon />
                    }
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                  },
                  {
                    name: "messages",
                    list: "/messages",
                    meta: {
                      icon: <ChatIcon />
                    }
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                  },
                  {
                    name: "profile",
                    list: "/profile",
                    meta: {
                      icon: <SwitchAccountIcon />
                    }
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                  },

                ]}
                options={{
                  syncWithLocation: false,
                  warnWhenUnsavedChanges: true,
                  projectId: "240zfW-9QxyID-4RYZUP",

                }
                }
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >

                        <ThemedLayout
                          // คลิปสอนตัว ThemeLayoutV2 
                          // แต่ของ V ผมไม่มีให้ refine swizzle V2 ครับ
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
                      element={<NavigateToResource resource="home" />}
                    />

                    <Route path="/home">
                      <Route index element={<Home />} />
                    </Route>
                    <Route path="/properties">
                      <Route index element={<AllProperties />} />
                      <Route path="create" element={<CreateProperties />} />
                      <Route path="show/:id" element={<PropertyDetail />} />
                      <Route path="edit/:id" element={<CreateProperties />} />
                    </Route>
                    <Route path="/agent">
                      <Route index element={<Agent />} />
                    </Route>
                    <Route path="/reviews">
                      <Route index element={<Review />} />
                    </Route>
                    <Route path="/messages">
                      <Route index element={<Message />} />
                    </Route>
                    <Route path="/profile">
                      <Route index element={<AgentProfile />} />
                    </Route>

                    {/* <Route path="*" element={<ErrorComponent />} /> */}
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
                    <Route path="/login" element={<Login />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
              {/* </DevtoolsProvider> */}
            </RefineSnackbarProvider >
          </ThemeProvider >
        </ColorModeContextProvider >
      </RefineKbarProvider >
    </BrowserRouter >
  );
}

export default App;



