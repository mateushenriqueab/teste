graph TB
    classDef provider fill:#667eea,stroke:#764ba2,stroke-width:3px,color:#fff
    classDef api fill:#f093fb,stroke:#f5576c,stroke-width:2px,color:#fff
    classDef catalog fill:#4facfe,stroke:#00f2fe,stroke-width:2px,color:#fff
    classDef frontend fill:#fa709a,stroke:#fee140,stroke-width:2px,color:#fff
    classDef devkit fill:#a8edea,stroke:#fed6e3,stroke-width:2px,color:#2d3748
    classDef database fill:#30cfd0,stroke:#330867,stroke-width:3px,color:#fff

    Provider["🔗 Provider (GitHub/Postgres)"]:::provider
    
    subgraph BEX["BEX Platform"]
        CatalogAPI["📚 Catalog API"]:::api
        CatalogGeral["🗂️ Catálogo Geral"]:::catalog
        
        subgraph CanaisDigitais["Catálogo Canais Digitais"]
            Frontend["💻 Frontend Catálogo Canais Digitais"]:::frontend
        end
    end
    
    subgraph DevKit["DevKit"]
        APIs["⚡ APIs Complementares"]:::devkit
        MFEs["🎨 MFes Complementares"]:::devkit
        DB[("💾 DB")]:::database
    end

    Provider -->|Data Provider| CatalogAPI
    CatalogAPI -->|Integration| CatalogGeral
    CatalogAPI -->|entity-ref| Frontend
    Frontend -.->|Consumes| APIs
    Frontend -.->|Consumes| MFEs
    APIs --> DB
    MFEs --> DB
