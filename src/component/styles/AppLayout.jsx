import React from "react";
// import type { ReactElement } from "react";
import styles from "./layout.module.css";
import Footer from "../src/components/main/Footer";
import Header from "../src/components/main/Header";

// interface LayoutProps {
//   children: ReactElement;
// }

export default function AppLayout({ children }) {
    return (
        React.createElement("div", { className: styles.Full },
            React.createElement("div", { className: styles.Inner },
                React.createElement(Header, null),
                children
            ),
            React.createElement(Footer, null)
        )
    );
}

// export default function AppLayout({ children }: LayoutProps) {
//   return (
//     <div className={styles.Full}>
//       <div className={styles.Inner}>
//         <Header />
//         {children}
//       </div>
//       <Footer />
//     </div>
//   );
// }
