<?php
define( 'WP_CACHE', true );








/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'u434968181_ZYGlk' );

/** Database username */
define( 'DB_USER', 'u434968181_Q1xlm' );

/** Database password */
define( 'DB_PASSWORD', 'qFreB5NnB1' );

/** Database hostname */
define( 'DB_HOST', '127.0.0.1' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'Avxyr,q98eOV_}^fLGy_Wm=2>GR7p^[n(Iajb85@n,MEbx/:,TgLxKN4Hiet$_Fc' );
define( 'SECURE_AUTH_KEY',   'C_j5I=Z>Ak9`=Gi031ZS62ZHLo(.ScZ={-ABU9D^nf5~ylIjkj26593wW0R]6u6y' );
define( 'LOGGED_IN_KEY',     ',L<<f}5L/U.5]2$[_PuW;Bk{EtNFRoDJdVEX`~F6=!3P:a-;kGX?(Ef0Hch|oU6?' );
define( 'NONCE_KEY',         '#=$XpjSDM#{l/Lxgip-*fk;P>~q: W^@CaJ-z@MFO7X52m%y`DUDe)*&N3px}r!_' );
define( 'AUTH_SALT',         '!9iBL^zKocY#SOExWLOZ,i>l#,> }/ }MDT8]#JaPG-lf{Ctpy?HcWVFl?/kgx_9' );
define( 'SECURE_AUTH_SALT',  '9(EIoU2;KK2wYuL1GSFhoM22pp#_Zh*_|r/>B>2I6Xlls??Y<d$GHM7Al`)6|)W#' );
define( 'LOGGED_IN_SALT',    'yvOGGP@#G1l`i[EFkIak&S,=mVl>j_bo|1q1!UyD=<Nb-W;@[sZ%DyuO/F%pVf<W' );
define( 'NONCE_SALT',        'vlFt}K$v%jvPkBm)E|GQ+3 6VS@@0Rj[L] ##_S%J:R.+v4hodbK$ovM^a>$R71*' );
define( 'WP_CACHE_KEY_SALT', 'YsiTwlO1W?.iE4>ssC4vUeo}T!Xi/;OI|R,=XCpW|;ENgy+[_/i-^st=vtsA J)^' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', true );
}
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', true ); // Set to false to prevent errors from displaying on the front end

define( 'FS_METHOD', 'direct' );
define( 'COOKIEHASH', '7b8a5de470b2b9037c09060d307be407' );
define( 'WP_AUTO_UPDATE_CORE', 'minor' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';



