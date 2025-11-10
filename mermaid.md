flowchart LR
  subgraph Backstage["Backstage (Host)"]
    Plugin["Plugin: MFE Chassi"] -->|injeta| Bridge["Bridge"]
    Theme["Theme MUI v5"] --> Bridge
    CatalogAPI["Catalog API"] --> Bridge
    Identity["Identity API"] --> Bridge
    FetchAPI["Fetch API"] --> Bridge
    Flags["Feature Flags"] --> Bridge
    Alerts["Alert/Error API"] --> Bridge
  end

  Backstage -->|carrega UMD| CDN["CDN / Express / Nginx"]
  CDN -->|mfe.umd.js| MFE["Microfrontend (UMD)"]

  Bridge -->|props| MFE
  MFE -->|HTTP| BE["Backend do MFE (Express)"]
  BE --> Ext1["ServiceNow"]
  BE --> Ext2["SonarQube"]
  BE --> Ext3["Outras APIs"]
