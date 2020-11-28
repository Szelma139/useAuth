import {
    Auth0UserProfile,
    Auth0DecodedHash,
    WebAuth,
    Auth0Error,
    AuthOptions,
    Auth0ParseHashError
} from "auth0-js";
import { ReactNode } from "react";

export type AuthState = {
    user:
        | (Auth0UserProfile & { [key: string]: any }) // adds metadata support for Auth0 Rules
        | { sub?: string; [key: string]: any };
    authResult?: Auth0DecodedHash | null;
    expiresAt: number | null;
    isAuthenticating: boolean;
    errorType?: string;
    error?: Error | Auth0Error | Auth0ParseHashError;
    config: {
        navigate: Function;
        customPropertyNamespace: string;
        authProvider?: any;
        callbackDomain: string;
    };
};

export interface useAuthInterface {
    (): {
        isAuthenticating: boolean;
        isAuthenticated: () => boolean;
        isAuthorized: (role: string | string[]) => boolean;
        user: Auth0UserProfile | { sub?: string };
        userId: string | null | undefined;
        authResult: Auth0DecodedHash | undefined | null;
        login: () => void;
        signup: () => void;
        logout: () => void;
        handleAuthentication: ({
            postLoginRoute
        }: {
            postLoginRoute?: string;
        }) => void;
        dispatch: (eventName: string, eventData?: any) => void;
    };
}

export type handleAuthResultInterface = (args: {
    err?: Error | Auth0ParseHashError | null;
    dispatch: any;
    authProvider: WebAuth;
    authResult: Auth0DecodedHash | null;
}) => Promise<boolean>;

export type setSessionInterface = (args: {
    dispatch: any;
    authProvider: WebAuth;
    authResult: Auth0DecodedHash;
}) => Promise<Auth0UserProfile>;

export type AuthProviderInterface = (props: {
    children: ReactNode;
    navigate: (path: string) => void;
    auth0_domain: string;
    auth0_audience_domain?: string;
    auth0_client_id: string;
    auth0_params?: AuthOptions;
    customPropertyNamespace?: string;
}) => JSX.Element;
