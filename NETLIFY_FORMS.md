# Netlify Forms - Configuració

Aquest document explica com gestionar les aportacions rebudes a través del formulari "Digue-hi la teva".

## Accés al Dashboard

1. Inicia sessió a [Netlify](https://app.netlify.com)
2. Selecciona el teu lloc web
3. Ves a **Forms** al menú lateral

## Gestió d'Aportacions

### Visualitzar submissions

Totes les aportacions apareixen a la pestanya **Forms** > **feedback**

Cada entrada mostra:
- Nom (si s'ha proporcionat)
- Email
- Tipus d'aportació
- Títol
- Missatge
- Data i hora

### Protecció Anti-Spam

Netlify filtra automàticament:
- **Honeypot field**: Camp ocult que els bots omplen
- **Rate limiting**: Limita submissions per IP
- **Spam detection**: Algoritme de detecció de spam

Les submissions sospitoses es marquen automàticament.

### Moderació

**Per aprovar una aportació:**
1. Revisa el contingut
2. Si és adequada, copia la informació
3. Afegeix-la manualment a la secció d'aportacions aprovades a `digue_hi.html`

**Per rebutjar:**
- Simplement no la publiquis
- Pots eliminar-la del dashboard si vols

### Notificacions

**Configurar notificacions per email:**
1. Ves a **Site settings** > **Forms**
2. Activa **Form notifications**
3. Afegeix el teu email
4. Rebràs un email cada vegada que algú enviï una aportació

## Publicar Aportacions Aprovades

Actualment, les aportacions aprovades s'han d'afegir manualment a `digue_hi.html`.

**Passos:**
1. Revisa l'aportació al dashboard de Netlify
2. Obre `digue_hi.html`
3. Afegeix una nova `.submission-card` amb el contingut:

```html
<div class="submission-card">
    <div class="submission-header">
        <span class="submission-type">[EMOJI] [TIPUS]</span>
        <span class="submission-date">[DATA]</span>
    </div>
    <div class="submission-title">[TÍTOL]</div>
    <div class="submission-content">
        [MISSATGE]
    </div>
    <div class="submission-author">— [NOM o Anònim]</div>
</div>
```

4. Commit i push els canvis a GitHub
5. Netlify desplegarà automàticament

## Límits del Pla Gratuït

- **100 submissions/mes** (pla gratuït)
- **10 MB** d'emmagatzematge per submission
- Retenció de dades: **1 mes**

Si es superen els límits, considera:
- Exportar dades regularment
- Upgrade al pla Pro ($19/mes) per a submissions il·limitades

## Exportar Dades

1. Ves a **Forms** > **feedback**
2. Clica **Export as CSV**
3. Descarrega el fitxer per fer backup

## Millores Futures (Opcional)

Per automatitzar la publicació d'aportacions aprovades:

1. **Netlify CMS**: Interfície visual per gestionar contingut
2. **Netlify Functions**: API per aprovar/rebutjar automàticament
3. **Airtable/Google Sheets**: Sincronització automàtica amb full de càlcul

Aquestes opcions requereixen configuració addicional però permeten gestió més eficient.
