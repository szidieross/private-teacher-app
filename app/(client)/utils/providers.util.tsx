// "use client";

// import { ReactNode, FC } from "react";
// import { CustomThemeProvider } from "../contexts/theme.context";
// import { ScrollProvider } from "../contexts/scroll.context";
// import { Web3Provider } from "../contexts/web3.context";
// import { PopupProvider } from "../contexts/popup.context";
// import { SnackbarProvider } from "notistack";
// import EnvironmentsModel from "../../common/models/environments.model";
// import EnvironmentProvider from "../contexts/environment.context";
// import StyledSnackbar from "../components/snackbar/snackbar.style";
// import SnackbarCloseButton from "../components/snackbar/close-button/close-button.component";
// import SearchProvider from "../contexts/search.context";
// import StoreProvider from "../contexts/store.context";

// type Props = {
//     children: ReactNode;
//     environments: EnvironmentsModel;
// };

// const Providers: FC<Props> = ({ children, environments }) => {
//     return (
//         <CustomThemeProvider>
//             <EnvironmentProvider environments={environments}>
//                 <SnackbarProvider
//                     anchorOrigin={{
//                         vertical: "bottom",
//                         horizontal: "center",
//                     }}
//                     Components={{
//                         success: StyledSnackbar,
//                         error: StyledSnackbar,
//                     }}
//                     action={(snackbarKey) => <SnackbarCloseButton snackbarKey={snackbarKey} />}
//                 >
//                     <StoreProvider>
//                         <PopupProvider>
//                             <ScrollProvider>
//                                 <SearchProvider> {children}</SearchProvider>
//                             </ScrollProvider>
//                         </PopupProvider>
//                     </StoreProvider>
//                 </SnackbarProvider>
//             </EnvironmentProvider>
//         </CustomThemeProvider>
//     );
// };

// export default Providers;